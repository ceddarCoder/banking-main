import HeaderBox from '@/components/HeaderBox'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import Rightsidebar from '@/components/Rightsidebar'
import React from 'react'
import { getLoggedInUser } from '@/lib/actions/user.actions'
import { getAccounts, getAccount} from '@/lib/actions/bank.actions'
import RecentTransactions from '@/components/RecentTransactions'



const home = async ({searchParams:{id,page}}:SearchParamProps) => {

    const currentPage = Number(page as string) || 1;

    const loggedIn = await getLoggedInUser();
    const accounts = await getAccounts({ 
      userId: loggedIn.$id 
    })
  
    if(!accounts) return;
    
    const accountsData = accounts?.data;
    const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;
    console.log("appwriteItemId", appwriteItemId);
    const account = await getAccount({ appwriteItemId })

    if (!accountsData || accountsData.length === 0) {
        // Handle the case where there are no accounts
        return <div>No accounts found</div>;
      }

  

  return (
    <section className='home'>
        <div className='home-content'>
            <header className='home-header'>
                <HeaderBox
                    type = 'greeting'
                    title = 'Welcome to Horizon'
                    user = { loggedIn?.firstName || 'Guest' }
                    subtext = 'Access and manage your account and transactions efficiently.'
                />
                <TotalBalanceBox 
                    accounts = {accountsData}
                    totalBanks = {accounts.totalBanks}
                    totalCurrentBalance = {accounts.totalCurrentBalance}
                />
               
            </header>
            <RecentTransactions
              accounts = {accountsData}
              transactions = {account?.transactions}
              appwriteItemId = {appwriteItemId}
              page = {currentPage}
            />
        </div>
        <Rightsidebar
            user = {loggedIn}
            transactions = {account?.transactions}
            banks = {accountsData.slice(0,2)}
        />
    </section>
  )
}

export default home