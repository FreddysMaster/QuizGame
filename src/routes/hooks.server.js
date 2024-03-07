import { prisma } from '$lib/server/prisma';

export const handle = async ({ event, resolve }) => {
  // get cookies from browser
  const session = event.cookies.get('session')

  console.log(session);

  if (!session) {
    // if there is no session load page as normal
    return await resolve(event)
  }

  // find the user based on the session
  const user = await prisma.user.findUnique({
    where: { userAuthToken: session },
    select: { username: true, user_type: true },
  })

  // if `user` exists set `events.local`
  if (user) {
    event.locals.user = {
      name: user.username,
      role: user.user_type,
    }
  }

  // load page as normal
  return await resolve(event)
}
