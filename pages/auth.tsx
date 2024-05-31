import { useTheme } from 'next-themes'
import React, { useState } from 'react'
import Cursor from '../components/Cursor'

import yourData from '../data/portfolio.json'
import Header from '../components/Header'

const LoginPage = () => {
  const { theme } = useTheme()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    console.log('Submitted!')
  }

  return (
    <div
      className={`container mx-auto ${yourData.showCursor && 'cursor-none'}`}
    >
      <Header isBlog></Header>
      {yourData.showCursor && <Cursor />}
      <div className="mt-10">
        <div
          className={`${
            theme === 'dark' ? 'bg-transparent' : 'bg-white'
          } flex items-center justify-center min-h-screen bg-gray-100`}
        >
          <div className="w-full max-w-lg p-10 rounded-lg shadow-lg">
            <h1
              className="mb-8 text-5xl font-bold text-center"
              style={{ color: '#0096FF' }}
            >
              Đăng Nhập
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block mb-2 text-3xl font-bold text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 text-3xl leading-tight text-black border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  style={{ backgroundColor: 'white' }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-8 mt-8">
                <label className="block mb-2 text-3xl font-bold text-gray-700">
                  Mật khẩu
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-3 text-3xl leading-tight text-black border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  style={{ backgroundColor: 'white' }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-6">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-6 w-6 text-red-600"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                  <span className="ml-3 text-lg text-gray-700">
                    Lưu đăng nhập
                  </span>
                </label>
              </div>
              <div className="flex items-center justify-center mb-6">
                <button
                  type="submit"
                  className="px-10 py-3 text-3xl font-bold text-white bg-red-600 rounded-full hover:bg-red-700 focus:outline-none focus:shadow-outline"
                >
                  Đăng nhập
                </button>
              </div>
              <div className="text-center">
                <a
                  href="#"
                  className="text-lg font-bold text-gray-600 hover:text-gray-800"
                >
                  Quên mật khẩu?
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
