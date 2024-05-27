const {exportFunctions} = require("better-firebase-functions");

const {initializeApp} = require("firebase-admin/app");

initializeApp();


exportFunctions({__filename, exports, searchGlob: "**/*.func.js"});
// exports.createCollection = functions.firestore
//     .document("trigger_document/{documentId}")
//     .onCreate(async (snapshot, context) => {
//         try {
//             const db = admin.firestore();
//             const collectionRef = db.collection("new_collection");
//             // Sprawdź, czy kolekcja już istnieje
//             const collectionSnapshot = await collectionRef.get();
//             if (collectionSnapshot.empty) {
//                 // Kolekcja nie istnieje, więc ją tworzymy
//                 await collectionRef.add({}); // Możesz dodać dowolne dane do kolekcji
//                 console.log("Kolekcja została utworzona pomyślnie");
//             } else {
//                 console.log("Kolekcja już istnieje");
//             }
//         } catch (error) {
//             console.error("Błąd podczas tworzenia kolekcji:", error);
//         }
//     });
//
//
// exports.deleteCollection = functions.firestore
//     .document("trigger_document/{documentId}")
//     .onCreate(async (snapshot, context) => {
//         try {
//             const db = admin.firestore();
//             const collectionRef = db.collection("new_collection");
//             // Sprawdź, czy kolekcja istnieje
//             const collectionSnapshot = await collectionRef.get();
//             if (!collectionSnapshot.empty) {
//                 // Kolekcja istnieje, więc ją usuwamy
//                 await collectionRef.delete({});
//                 console.log("Kolekcja została usunięta pomyślnie");
//             } else {
//                 console.log("Kolekcja nie istnieje");
//             }
//         } catch (error) {
//             console.error("Błąd podczas usuwania kolekcji:", error);
//         }
//     })


// exports.setUser = functions.https.onRequest((req, res) => {
//     console.log(req.params);
//     res.status(200).send("Success!");
// })

// exports.onUserSignUp = functions.auth.user().onCreate(async (user) => {
//     if (user) {
//         const userDoc = {
//             uid: user.uid,
//             email: user.email,
//             displayName: user.displayName,
//             photoURL: user.photoURL || '/avatar/avatar.png',
//             emailVerified: user.emailVerified || false,
//             phoneNumber: user.phoneNumber || 'No phone number',
//             role: user.customClaims
//         }
//         try {
//             const customClaims = (await admin.auth().getUser(user.uid)).customClaims
//
//             let userRole = "user"
//             if (customClaims && customClaims.role === "super_admin") {
//                 return;
//             } else if (customClaims && customClaims.role === "admin") {
//                 userRole = "admin";
//             }
//             userDoc.role = userRole;
//             await db.collection('users').doc(user.uid).set(userDoc);
//         } catch (error) {
//             console.error('Error adding user to database:', error);
//         }
//     }
// });
//
// exports.onDeleteUser = functions.firestore
//     .document("users/{documentId}")
//     .onDelete(async (snapshot, context) => {
//         console.log("snapshot" + snapshot.id)
//         try {
//             await admin.auth().deleteUser(snapshot.id)
//         } catch (error) {
//             console.error("Error: ", error);
//         }
//     })