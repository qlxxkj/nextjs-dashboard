'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

const FormSchema = z.object({
    id: z.string(),
    customerId: z.string({
        invalid_type_error: 'Please select a customer.',
    }),
    amount: z.coerce
        .number()
        .gt(0,{ message: 'Please enter an amount greater than $0.' }),
    status: z.enum(['pending', 'paid'], {
        invalid_type_error: 'Please select an invoice status.',
    }),
    date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export type State = {
    errors?:{
        customerId?: string[];
        amount?: string[];
        status?: string[];
    };
    message?: string | null;
};

// createInoice
export async function createInvoice(prevState: State, formData: FormData) {
    
    const validatedFields = CreateInvoice.safeParse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });

    if (!validatedFields.success) {
        return {
          errors: validatedFields.error.flatten().fieldErrors,
          message: 'Missing Fields. Failed to Create Invoice.',
        };
    }

    const { customerId, amount, status } = validatedFields.data;
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];

    try {
        await sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
        `;
    } catch (error) {
        return{
            message: 'Database Error: Failed to Create Invoice.'
        };
    }


    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}

// updateInoice:
export async function updateInvoice(
    id: string, 
    prevState: State, 
    formData: FormData
) {
    const validatedFields = UpdateInvoice.safeParse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });

    if (!validatedFields.success) {
        return {
          errors: validatedFields.error.flatten().fieldErrors,
          message: 'Missing Fields. Failed to Update Invoice.',
        };
    }

    const { customerId, amount, status } = validatedFields.data;
    const amountInCents = amount * 100;
    
    try {
        await sql`
        UPDATE invoices
        SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
        WHERE id = ${id}
      `;
    } catch (error) {
        return{
            message: 'Database Error: Failed to Update Invoice.'
        };
    };


    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');

}

// deleteInoice
export async function deleteInvoice(id: string) {
    throw new Error('Failed to Delete Invoice');

    try {
        await sql`DELETE FROM invoices WHERE id = ${id}`;
        revalidatePath('/dashboard/invoices');
        return{ message:'Deleted Invoice' };
    } catch (error) {
        return{
            message: 'Database Error: Failed to Delete Invoice.'
        };
    }
}

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
  ) {
    try {
      await signIn('credentials', formData);
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case 'CredentialsSignin':
            return 'Invalid credentials.';
          default:
            return 'Something went wrong.';
        }
      }
      throw error;
    }
  }

  export async function verifyCode(email: string, code: string) {
    try {
      // 验证码格式检查
      if (!code || code.length !== 6 || !/^\d+$/.test(code)) {
        return { error: '验证码格式不正确' };
      }
  
      // 从数据库查询验证码记录
      const result = await sql`
        SELECT * FROM verification_codes 
        WHERE email = ${email} 
        AND code = ${code}
        AND created_at > NOW() - INTERVAL '5 minutes'
        AND used = false
        LIMIT 1
      `;
  
      if (result.rows.length === 0) {
        return { error: '验证码无效或已过期' };
      }
  
      // 标记验证码为已使用
      await sql`
        UPDATE verification_codes 
        SET used = true 
        WHERE email = ${email} AND code = ${code}
      `;
  
      return { success: true, message: '验证成功' };
    } catch (error) {
      console.error('验证码验证失败:', error);
      return { error: '验证失败，请稍后重试' };
    }
  }