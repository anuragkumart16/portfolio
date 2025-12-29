import React from 'react'
import Link from 'next/link'

function Navbar({audience}: {audience: string}) {
    return (
        <div className='fixed top-0 left-0 right-0 z-50 w-full'>
            <div className='flex items-center justify-center py-4 px-4 md:px-8'>
                <div className='border border-zinc-800 rounded-full py-4 px-8 flex flex-row gap-6 bg-zinc-950 mt-2'>
                    <Link href="/">Home</Link>
                    {(audience === "freelance" || audience === "general") && <Link href="/">Experience</Link>}
                    <Link href="/">Skills</Link>
                    <Link href="/">Projects</Link>
                    {(audience === "freelance" || audience === "general") && <Link href="/">Testimonials</Link>}
                    <Link href="/">Contact</Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar