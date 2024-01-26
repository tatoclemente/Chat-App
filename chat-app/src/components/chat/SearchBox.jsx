import React, { useContext } from 'react'
import { AuthContext } from '../../auth/AuthContext'

export const SearchBox = () => {

  const { auth, logout } = useContext(AuthContext)

  return (
    <div className="headind_srch">
      <div className="recent_heading mt-2 d-flex">
        <img 
          style={{width: 40}}
          className='rounded-circle border border-3 border-danger-subtle'
          src="/avatar.jpg" alt="avatar" />
        <h4>{auth.name}</h4>
      </div>
      <div className="srch_bar">
        <div className="stylish-input-group">
          <button 
            onClick={ () => logout() }
            className="btn text-danger">
            Salir
          </button>
        </div>
      </div>
    </div>
  )
}
