import { doc, getDoc } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";
import { database } from "../../../services/firebase";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { catId } = req.query;

    if (catId) {
        const categoryRef = doc(database, "categories", `${catId}`);

        const docSnap = await getDoc(categoryRef);

        let values: any = [];

        if (docSnap.exists()) {
            // Convert to City object
            const cat = docSnap.data();
            // Use a City instance method
            res.status(200).json({ reference: docSnap.id, ...cat })

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
