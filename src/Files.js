import React, { useEffect, useState } from 'react';
import { withSSRContext } from 'aws-amplify';
import { listFiles } from './graphql/queries';
import { Storage } from "aws-amplify";


const Files = () => {
    const [ files, setFiles ] = useState([]);

    const getFiles = async () => {
        const SSR = withSSRContext();
        const { data } = await SSR.API.graphql({
            query: listFiles
        });

        setFiles(data.listFiles.items);
        console.log( data.listFiles.items )
    }

    useEffect(() => {
        getFiles();
    }, [])

    const downloadFile = async (key) => {
        const signedURL = await Storage.get(key, { level: 'protected', download: true }); 

        console.log(signedURL)
    }

    return (
        <div>
            {
                files.map(file => 
                    <div key={file.id} >
                        <h2>{file.name}</h2>
                        <div
                            onClick={() => downloadFile(file.key)}
                        >
                            Download
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default Files;