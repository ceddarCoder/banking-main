import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import BankCard from './BankCard'
import { countTransactionCategories } from '@/lib/utils'
import Category from './Category'
import PlaidLink from './PlaidLink'

const Rightsidebar = ({user, transactions, banks}:RightSidebarProps) => {

    const categories : CategoryCount[] = countTransactionCategories(transactions)


  return (
    <aside className='right-sidebar'>
        <section >
    <div className='profile-banner'>
        <div className='profile'>
            <div className='profile-img'>
                <span className='text-xl font-bold text-blue-500'>
                    {user?.firstName[0]}
                </span>
            </div>
            <div className='profile-details'>
                <h1 className='profile-name text-white text-sm font-semibold'>
                    {user.firstName} {user.lastName}
                </h1>
                <p className='profile-email text-xs text-gray-200'>
                    {user?.email}
                </p>
            </div>
        </div>
    </div>
</section>



        <section className='banks pt-2'>
            <div className='flex items-center w-full justify-between mb-1'>
                <h2 className='header-2'>
                    My Banks
                </h2> 
                    {/* <Link href='/' className='flex gap-2'>
                        <Image src = './icons/plus.svg' width={20} height={20} alt='plus'/>
                        <h2 className='text-14 font-semibold text-gray-600'>
                            Add Bank
                        </h2>
                    </Link>   */}
                <PlaidLink user={user} variant="ghost"/>

                
            </div>
            {banks?.length>0 && (
                <div className='relative flex flex-1 flex-col items-center justify-start gap-2'>
                    <div className='relative z-10'>
                        <BankCard
                            key={banks[0].$id}
                            account = {banks[0]}
                            userName = {`${user.firstName} ${user.lastName}`}
                            showBalance = {false}
                        />
                    </div>
                    {banks[1] && (
                        <div className='absolute right-0 top-8 z-0 w-[90%]'>
                            <BankCard
                                key={banks[1].$id}
                                account = {banks[1]}
                                userName = {`${user.firstName} ${user.lastName}`}
                                showBalance = {false}
                            />
                        </div>
                    )}
                </div>
            )
            }
            <div className='mt-10 flex flex-1 flex-col gap-[1.25rem]'>
                <h2 className='header-2 pt-[2.5rem]'>
                    Top Categories
                </h2>
                <div className='space-y-5'>
                    {categories.map((category,index) => (
                        <Category
                            key={category.name}
                            category={category}
                        />
                    ))}
                </div>
            </div>
        </section>
    </aside>
  )
}

export default Rightsidebar

