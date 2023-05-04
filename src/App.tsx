import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Navigationbar from './components/navbar/navbar'

import { Routes, Route } from 'react-router-dom'
import PrivateRoute from './routes/PrivateRoute';

import LoginPage from './pages/login_page/login'
import WelcomePage from './pages/welcome_page/welcomePage'
import Register from './pages/register_page/register'
import SettingsPage from './pages/settings_page/settingsPage'
import DashboardPage from './pages/dashboard_page/dashboardPage'
import ShoppinglistPage from './pages/shopping_list_page/shoppingListPage'
import BankBalancePage from './pages/bank_balance_page/bankBalancePage'
import CalenderPage from './pages/calender_page/calenderPage'
import StatisticPage from './pages/statistic_page/statisticPage'
function App() {
  return (
    <div>
      <Navigationbar />
      <div className="App">
        <Routes>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/settings" element={
            <PrivateRoute>
              <SettingsPage />
            </PrivateRoute>
          }/>
          <Route path="/dashboard" element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }/>
          <Route path="/shoppinglist" element={
            <PrivateRoute>
              <ShoppinglistPage />
            </PrivateRoute>
          }/>
          <Route path="/bankbalance" element={
            <PrivateRoute>
              <BankBalancePage />
            </PrivateRoute>
          }/>
          <Route path="/calender" element={
            <PrivateRoute>
              <CalenderPage />
            </PrivateRoute>
          }/>
          <Route path="/statistic" element={
            <PrivateRoute>
              <StatisticPage />
            </PrivateRoute>
          }/>
          <Route path="/" element={<WelcomePage />}/>
        </Routes>
        
      </div>
    </div>
  )
}

export default App
