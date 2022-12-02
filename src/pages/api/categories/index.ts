import { collection, getDocs } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";
import { database } from "../../../services/firebase";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const categoryRef = collection(database, "categories");

    const querySnapshot = await getDocs(categoryRef);

    let values:any = [];


    querySnapshot.forEach((doc) => {
        values.push({
            reference: doc.id,
            ...doc.data()
        })
    });

    res.status(200).json(values)
}
