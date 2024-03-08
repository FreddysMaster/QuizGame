import { prisma } from '$lib/server/prisma';

export const handle = async ({ event, resolve }) => {
  // get cookies from browser
  const session = event.cookies.get('session')

  if (!session) {
    // if there is no session load page as normal
    return await resolve(event)
  }

  // find the user based on the session
  const user = await prisma.users.findUnique({
    where: { userAuthToken: session },
    select: { username: true, user_type: true },
  })

  // if `user` exists set `events.local`
  if (user) {
    event.locals.user = {
      username: user.username,
      user_type: user.user_type,
    }
  }

  // load page as normal
  return await resolve(event)
}
