import BankCard from '@/components/BankCard';
import HeaderBox from '@/components/HeaderBox'
import { getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import React from 'react'

const page = async () => {
  const loggedIn = await getLoggedInUser();
  const accounts = await getAccounts({ 
    userId: loggedIn.$id 
  })
  return (
    <section className='flex '>
      <div className='my-banks'>
        <HeaderBox
          title='My Banks'
          subtext='Effortlessly manage your banks'
        />

        <div className='space-y-4'>
          <h2 className='header-2'>
            Your Cards
          </h2>
          <div className='flex flex-wrap gap-6'>
            {accounts && accounts.data.map((a:Account)=>(
              <BankCard
                key={a.id}
                account={a}
                userName={loggedIn?.firstName || 'Guest'}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

export default page