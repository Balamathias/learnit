import React from 'react'
import MaxWrapper from './MaxWrapper'

type Props = {}

const Footer = (props: Props) => {
  return (
    <MaxWrapper>
        <footer className='flex flex-1 flex-col gap-3'>
            <p className="text-muted-foreground">&copy; {new Date().getFullYear()}, Bala Mathias. Created with ❤</p>
        </footer>
    </MaxWrapper>
  )
}

export default Footer