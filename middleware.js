import { NextResponse } from 'next/server';
import * as jose from 'jose';
import Cookies from 'js-cookie'
import { withAuth } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";

const KEY = process.env.JWT_KEY;

// export default withAuth({
//   callbacks: {
//     authorized({ req, token }) {
//       // `/admin` requires admin role
//       if (req.nextUrl.pathname === "/admin") {
//         return token?.userRole === "admin"
//       }
//       // `/me` only requires the user to be logged in
//       return !!token
//     },
//   },
// })

// export const config = { matcher: ["/admin", "/"] }

// export default withAuth({
//   pages: {
//     signIn: "/auth/login",
//   }
// });

// export function middleware(request) {
//   console.log('okeey boss')
//   console.log("token: ", request.nextauth?.token);
//   // if (request.nextUrl.pathname.startsWith('/auth/login')) {
//   //   // return NextResponse.rewrite(new URL('/about-2', request.url))
//   // }
// }

// export const config = {
//   matcher: ["/admin/:path*", "/user/:path*", "/auth/login"],
// };

// export default withAuth(
//   // `withAuth` augments your `Request` with the user's token.
//   function middleware(req) {
//     // if (
//     //   req.nextUrl.pathname.startsWith('/auth/login')
//     // ) {
//     //   return NextResponse.redirect(new URL('/', req.url))
//     // }

//     console.log("token: ", req.nextauth.token);

//     // if (req.nextUrl.pathname.startsWith("/admin") && req.nextauth.token?.role !== "admin")
//     //   return NextResponse.rewrite(
//     //     new URL("/auth/login?message=You Are Not Authorized!", req.url)
//     //   );
//     // if (req.nextUrl.pathname.startsWith("/user") && req.nextauth.token?.role !== "user")
//     //   return NextResponse.rewrite(
//     //     new URL("/auth/login?message=You Are Not Authorized!", req.url)
//     //   );
//   },
//   // {
//   //   callbacks: {
//   //     authorized: ({ token }) => !!token,
//   //   },
//   // }
  
// );

// export const config = {
//   matcher: ["/admin/:path*", "/user/:path*", "/auth/login"],
// };

export async function middleware(req) {
  const token = await getToken({
    req: req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  // console.log(token)

  // if (
  //   req.nextUrl.pathname.startsWith('/auth/login') &&
  //   token == null
  // ) {
  //   return NextResponse.next();
  // }

  if (
    (req.nextUrl.pathname == '/' || req.nextUrl.pathname == '/admin')  &&
    token?.Role == 'admin'
  ) {
    return NextResponse.redirect(new URL('/admin/dashboard', req.url))
  }

  if (
    req.nextUrl.pathname == '/' &&
    token?.Role == 'user'
  ) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  if (
    req.nextUrl.pathname.startsWith('/admin')  &&
    token?.Role != 'admin'
  ) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  // // console.log(Cookies.get('userData'))
  // console.log(req.cookies.get("next-auth"))
  // const userCookie = req.cookies.get("isLogin")
  // const token = req.headers.get('authorization');
  // if (token) {
  //   const jwtToken = token.split(' ')[1];
  //   try {
  //     const { payload } = await jose.jwtVerify(
  //       jwtToken,
  //       new TextEncoder().encode(KEY)
  //     );

  //     if (
  //       req.nextUrl.pathname.startsWith('/api/hello') &&
  //       payload.Role === 'user'
  //     ) {
  //       return NextResponse.next();
  //     }
  //     if (
  //       req.nextUrl.pathname.startsWith('/api/university') &&
  //       payload.Role === 'admin'
  //     ) {
  //       return NextResponse.next();
  //     }
  //   } catch (error) {
  //     return new NextResponse(JSON.stringify({ message: error.message }), {
  //       status: 401,
  //     });
  //   }
  // }
  return NextResponse.next();
}

// export const config = {
//   matcher: ['/api/hello/:path*', '/api/university/:path*'],
// };

// return NextResponse.redirect(new URL('/login', request.url))