import React, { useMemo } from "react";

import { GoogleAuthProvider } from "firebase/auth";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter as Router } from "react-router-dom";

import logo from '../public/logo.svg'

import "typeface-rubik";
import "@fontsource/ibm-plex-mono";

import {
  buildCollection,
  CircularProgressCenter,
  createCMSDefaultTheme,
  FirebaseAuthController,
  FirebaseLoginView,
  FireCMS,
  ModeControllerProvider,
  NavigationRoutes,
  Scaffold,
  SideDialogs,
  SnackbarProvider,
  useBuildModeController,
  useFirebaseAuthController,
  useFirebaseStorageSource,
  useFirestoreDataSource,
  useInitialiseFirebase,
  useValidateAuthenticator
} from "firecms";

import { firebaseConfig } from "./firebase-config";

const DEFAULT_SIGN_IN_OPTIONS = [
  GoogleAuthProvider.PROVIDER_ID
];


import { getStorage, connectStorageEmulator } from 'firebase/storage'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import {
  getAuth,
  connectAuthEmulator,
  EmailAuthProvider,
  User as FirebaseUser,
} from 'firebase/auth'

import {lecturerCollection} from "./collections/lecturer.tsx"
import {usersCollection} from "./collections/users.tsx"
import {coursesCollection} from "./collections/courses.tsx";
export default function App() {

  const signInOptions = DEFAULT_SIGN_IN_OPTIONS;

  const onFirebaseInit = async () => {
    const db = getFirestore();
    const auth = getAuth();
    const storage = getStorage();
    connectFirestoreEmulator(db, '127.0.0.1', 8080);
    connectAuthEmulator(auth, 'http://127.0.0.1:9099');
    connectStorageEmulator(storage, '127.0.0.1', 9199);
  };


  const {
    firebaseApp,
    firebaseConfigLoading,
    configError,
    firebaseConfigError
  } = useInitialiseFirebase({ firebaseConfig, onFirebaseInit });

  const authController: FirebaseAuthController = useFirebaseAuthController({
    firebaseApp,
    signInOptions
  });

  const dataSource = useFirestoreDataSource({
    firebaseApp
  });


  const storageSource = useFirebaseStorageSource({ firebaseApp });

  const modeController = useBuildModeController();
  const theme = useMemo(() => createCMSDefaultTheme({ mode: modeController.mode }), [modeController.mode]);

  const {
    authLoading,
    canAccessMainView,
    notAllowedError
  } = useValidateAuthenticator({
    authController,
    authentication: async ({ user }) => {
      console.log("Allowing access to", user?.email);
      console.log(user)
      return true;
    },
    dataSource,
    storageSource
  });

  if (configError) {
    return <div> {configError} </div>;
  }

  if (firebaseConfigError) {
    return <div>
      It seems like the provided Firebase config is not correct. If you
      are using the credentials provided automatically by Firebase
      Hosting, make sure you link your Firebase app to Firebase
      Hosting.
    </div>;
  }

  if (firebaseConfigLoading || !firebaseApp) {
    return <CircularProgressCenter/>;
  }



  return (
      <Router>
        <SnackbarProvider>
          <ModeControllerProvider
              value={modeController}>
            <FireCMS authController={authController}
                     collections={[coursesCollection, lecturerCollection, usersCollection]}
                     dataSource={dataSource}
                     storageSource={storageSource}
                     entityLinkBuilder={({ entity }) => `https://console.firebase.google.com/project/${firebaseApp.options.projectId}/firestore/data/${entity.path}/${entity.id}`}
            >
              {({ context, loading }) => {

                let component;
                if (loading) {
                  component = <CircularProgressCenter/>;
                } else if (!canAccessMainView) {
                  component = (
                      <>
                        <FirebaseLoginView
                            allowSkipLogin={false}
                            signInOptions={signInOptions}
                            firebaseApp={firebaseApp}
                            logo={logo}
                            authController={authController}/>
                      </>
                  );
                } else {
                  component = (
                      <Scaffold name={"My notes"} logo={logo}>
                        <NavigationRoutes/>
                        <SideDialogs/>
                      </Scaffold>
                  );
                }

                return (
                    <ThemeProvider theme={theme}>
                      <CssBaseline/>
                      {component}
                    </ThemeProvider>
                );
              }}
            </FireCMS>
          </ModeControllerProvider>
        </SnackbarProvider>
      </Router>
  );

}