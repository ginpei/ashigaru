import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { HomePage } from '../src/pages/home/HomePage'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <HomePage />
  )
}

export default Home
