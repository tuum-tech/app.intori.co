import admin from 'firebase-admin'

let firebaseAdmin: admin.app.App | undefined

const initiateAdmin = () => {
  if (typeof window !== "undefined") {
    return undefined
  }

  if (firebaseAdmin) {
    return firebaseAdmin
  }

  if (admin.apps.length > 0) {
    firebaseAdmin = admin.app()
    return firebaseAdmin
  }

  const firebaseAdminConfig = {
    type: "service_account",
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKeyId: process.env.FIREBASE_PRIVATE_KEY_ID,
    privateKey: (process.env.FIREBASE_PRIVATE_KEY || 'Missing FIREBASE_PRIVATE_KEY').replace(/\\n/g, '\n'),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    clientId: process.env.FIREBASE_CLIENT_ID,
    authUri: process.env.FIREBASE_AUTH_URI,
    tokenUri: process.env.FIREBASE_TOKEN_URI,
    authProviderX509CertUrl: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    clientX509CertUrl: process.env.FIREBASE_CLIENT_X509_CERT_URL
  }

  try {
    firebaseAdmin = admin.initializeApp({
      credential: admin.credential.cert(firebaseAdminConfig)
    }, 'admin')

    return firebaseAdmin
  } catch (err) {
    return admin.app()
  }
}

export { initiateAdmin }
