import React, { useState } from 'react'
import { toast } from 'react-toastify'
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { FrameGenerator } from '../../../components/farcaster-frames/StepGenerator'
import { AppLayout } from "@/layouts/App"
import { Section } from '../../../components/common/Section'
import {
    IntoriFrameType,
    introductionStep
} from '../../../utils/frames/intoriFrameForms'
import Input from '../../../components/common/Input'
import { PrimaryButton } from '../../../components/common/Button'
import styles from './FramePage.module.css'
 
type Props = {
  postUrl: string
  imageUrl: string
  frameUrl: string
  frame: IntoriFrameType
}
 
export const getServerSideProps = (async (context) => {
  if (!context?.params?.name) {
    return {
      notFound: true
    }
  }

  const frameUrl = `${process.env.NEXTAUTH_URL}/frames/sequence`
  const postUrl = `${process.env.NEXTAUTH_URL}/api/frames/submit`
  const imageUrl = `${process.env.NEXTAUTH_URL}/assets/frames/introduction.png`

  return {
    props: {
      postUrl,
      imageUrl,
      frameUrl,
      frame: introductionStep
    }
  }
}) satisfies GetServerSideProps<Props>
 
export default function Page({
  postUrl,
  imageUrl,
  frameUrl,
  frame
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [copyButtonText, setCopyButtonText] = useState('Copy Frame Link')

  const copyUrlToClipboard = () => {
    navigator.clipboard.writeText(frameUrl)
    toast.success('Frame link copied to clipboard 😎')
    setCopyButtonText('Copied!')
    setTimeout(() => {
      setCopyButtonText('Copy Frame Link')
    }, 2000)
  }

  return (
    <>
      <FrameGenerator
        frame={frame}
        imageUrl={imageUrl}
        postUrl={postUrl}
        frameUrl={frameUrl}
      />
      <AppLayout>
        <Section>
          <div className={styles.shareFrameContainer}>
            <div className="text-center">
              <h1>Your data, connected.</h1>

              <div className={styles.inputContainer}>
                <Input
                  label="Share this frame with others and gain points!"
                  value={frameUrl}
                  onChange={console.log}
                  placeholder="Frame URL"
                  onClick={copyUrlToClipboard}
                  readOnly
                />
                <PrimaryButton onClick={copyUrlToClipboard}>
                  {copyButtonText}
                </PrimaryButton>
              </div>
            </div>
          </div>
        </Section>
      </AppLayout>
    </>
  )
}