import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null)
  const [consentimentoLGPD, setConsentimentoLGPD] = useState(false)

  function logout() {
    setUsuario(null)
  }

  function revogarConsentimento() {
    setConsentimentoLGPD(false)
  }

  function excluirDados() {
    setUsuario(null)
    setConsentimentoLGPD(false)
  }

  const value = {
    usuario,
    setUsuario,
    logout,
    consentimentoLGPD,
    setConsentimentoLGPD,
    revogarConsentimento,
    excluirDados,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth deve ser usado dentro de AuthProvider')
  return ctx
}
