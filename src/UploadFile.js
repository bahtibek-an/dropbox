import React, { useState } from 'react';
import { Storage, API } from 'aws-amplify';
import { createFile } from "./graphql/mutations";
// import { listFiles } from "./graphql/queries"
import awsExports from "./aws-exports";

const UploadFile = () => {
    const [file, setFile] = useState("");

    // const getFiles = async () => {
    //     const files = await API.graphql(graphqlOperation(listFiles));

    // }

    // useEffect(() => {
    //     getFiles()
    // }, [])
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(file)
        

        const uploadedFile = await Storage.put(file.name, file);

        const filenew = {
            query: createFile,
            variables: {
                input: {
                    name: file.name,
                    file: {
                        bucket: awsExports.aws_user_files_s3_bucket,
                        region: awsExports.aws_user_files_s3_bucket_region,
                        key: uploadedFile.key
                    }
                }
            }
            
        }

        const newFile = await API.graphql(filenew);

        console.log(newFile)
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create File</h2>
            <label>
                <input 
                    type="file" 
                    name="file" 
                    onChange={e => setFile(e.target.files[0])}
                />
                <input type="submit" value="create" />
            </label>
        </form>
    );
};

export default UploadFile;