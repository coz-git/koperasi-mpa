'use client'
import React, { useContext, useEffect } from 'react'
import { UserContext } from '../../../context/userContext';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie'

const layout = (props) => {
  const router = useRouter();
  const { isLogin, userData } = useContext(UserContext);

  useEffect(() => {
    // if(isLogin) {
    //   router.push('/');
    // }
    // console.log(JSON.parse(Cookies.get('userData')))
    // console.log(isLogin)
    // console.log(userData)
  }, [isLogin, userData])

  return (
    <>{props.children}</>
  )
}

export default layout

// export getServerSideProps = async () => {
//   // console.log(JSON.parse(Cookies.get('userData')))
//   console.log('cobaaa')
//   // redirect test: always redirect to '/login'
//   // ctx.res.setHeader('Location', '/login');
//   // ctx.res.statusCode = 302;
//   // ctx.res.end();
//   return {
//     props: {},
//   };
// };

