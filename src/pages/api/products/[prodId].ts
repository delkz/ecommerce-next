import { doc, getDoc } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";
import { database } from "../../../services/firebase";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { prodId } = req.query;

    if (prodId) {
        const productsRef = doc(database, "products", `${prodId}`);

        const docSnap = await getDoc(productsRef);

        if (docSnap.exists()) {
            // Convert to City object
            const prod = docSnap.data();
            // Use a City instance method
            res.status(200).json({reference: docSnap.id,...prod})

        } else {
            res.status(404).json({
                error: "No such document!"
            })
        }
    } else {
        res.status(404).json({
            error: "Need to pass a reference"
        })
    }



}
