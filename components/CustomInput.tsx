import React from 'react'
import { FormControl, FormField, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Control, FieldPath } from 'react-hook-form'
import { AuthFormSchema } from '@/lib/utils'
import { z } from 'zod'

const formSchema = AuthFormSchema('sign-up')

interface CustomInputProps {
  control: Control<z.infer<typeof formSchema>>
  name: FieldPath<z.infer<typeof formSchema>>
  label: string
  placeholder: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomInput = ({control, name, label, placeholder,onChange}:CustomInputProps) => {
  return (
    <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <div className='form-item'>
            <FormLabel className='form-label'>
                {label}
            </FormLabel>
            <div className='flex w-full flex-col space-y-1'>
                <FormControl>
                    <Input 
                    placeholder={placeholder}
                    className='input-class'
                    type={name === 'password'? 'password' : 'text'}
                    {...field}
                    onChange={(e) => {
                      field.onChange(e); // Call react-hook-form's onChange
                      if (onChange) onChange(e); // Call the custom onChange handler if provided
                    }}
                    />
                </FormControl>
                <FormMessage className='form-message' style={{ marginTop: '0.25rem' }} /> {/* Inline style for fine control */}
            </div>
          </div>
        )}  
    />
  )
}

export default CustomInput