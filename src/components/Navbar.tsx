import Link from "next/link"
import MaxWrapper from "./MaxWrapper"
import { ModeToggle } from "./ModeToggle"
import SignInButton from "./SignInButton"
import UserAccountNav from "./UserAccountNav"
import { getUserSession } from "@/lib/nextauth"


const Navbar = async () => {
  const session = await getUserSession()
  const user = session?.user
  return (
    <nav className="sticky z-50 bg-blend-darken bg-muted top-0 inset-x-0 h-16">
        <section className="bg-blend-darken bg-muted relative">
            <MaxWrapper className="md:p-12">
                <div className="flex justify-between items-center">
                    <div className="ml-2 lg:ml-0 flex itmes-center gap-3">

                        <div className="flex items-center justify-center ml-2 lg:ml-0">
                            <Link href={'/'} className="flex text-3xl items-center justify ml-2 lg:ml-0 center">
                                {"Learnit"}
                            </Link>
                        </div>
                    </div>
                    <div className="ml-auto flex flex-1 items-center lg:flex lg:flex-1 lg:items-center gap-3.5 justify-end mr-2">

                        <ModeToggle />
                        {!user && (
                            <span className="h-6 bg-foreground w-px lg:ml-6"></span>
                            )}
                        {!user ? (
                            <SignInButton>Sign In</SignInButton>
                        ): (
                            <UserAccountNav user={user}/>
                        )}
                    </div>
                </div>
            </MaxWrapper>
        </section>
    </nav>
  )
}

export default Navbar