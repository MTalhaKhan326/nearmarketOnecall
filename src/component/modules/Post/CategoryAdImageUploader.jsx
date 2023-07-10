import { useRef, useState } from "react";
import { Label } from "./CreatePostScreen.jsx";
import { AppImages } from "../../../Asset/images/image.js";
import { getDownloadURL, ref as firebase_ref, uploadBytesResumable } from "firebase/storage";
import firebase_service from "../../../utils/firebase_service.js";

function CategoryAdImageUploader({ categoryName, check_post_ad_files }) {
    const ref = useRef(null)
    const [visible, setVisible] = useState(true)
    const [files, setFiles] = useState([])

    function handleOnChange(e) {
        let newFiles = []
        if(e.target.files) {
            newFiles = Array.from(e.target.files).map(file => ({
                file: file,

                status: 'uploading'
            }))
            setFiles([...files, ...newFiles])
        }
        if(newFiles.length) {
            newFiles.forEach(file => {
                uploadFileOnFirebase(
                    file,
                    {
                        onSuccess: (url) => {
                            file.download_url = url 
                            file.status = 'uploaded'
                            setFiles([...files, ...newFiles])
                            if(typeof check_post_ad_files === 'function') {
                                check_post_ad_files([...files, ...newFiles])
                            }
                        },
                        onProgress: progress => {
                            file.upload_progress = progress 
                            setFiles([...files, ...newFiles])
                        }
                    }
                )
            })
        }
    } 

    function handleClickOnDeleteBtn(file) {
        setFiles(files.filter(item => item !== file))
    }

    function handleClickOnImage(file) {
        window.open(URL.createObjectURL(file.file), "_blank")
    }

    function uploadFileOnFirebase(file, args = {onSuccess: null, onProgress: null}) {
        const _ref = firebase_ref(firebase_service.storage, `/post-category-ads-images/${categoryName ? `${categoryName.toLowerCase()}/` : ""}${Date.now() + "-" + file.file.name}`)
        const uploadTask = uploadBytesResumable(_ref, file.file)
        uploadTask.on(
            'state_changed', 
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                if(typeof args.onProgress === 'function') {
                    args.onProgress(progress)
                }
            },
            (error) => {
                console.log('error uploading')
                console.log(error)
            },
            async () => {
                const url = await getDownloadURL(uploadTask.snapshot.ref)
                console.log(url)
                if(typeof args.onSuccess === 'function') {
                    args.onSuccess(url)
                }
            }
        )
    }

    if(!visible) {
        return <></>
    }

    return (  
        <div className="mx-2 my-2">
            <Label text={"Add category ad's images"} subtitle={"These images will be shown on the webpage to the user whose post is being published"} />
            {
                // isUploading ? <img src={AppImages.loading} alt="loading" className="w-[25px] h-[25px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]" />
                // :
                <div className="my-4">
                    <div className="flex items-center justify-start">
                        <div 
                            className="w-[100px] h-[100px] mr-2 border-2 rounded border-gray-300 relative bg-slate-200 cursor-pointer"
                            onClick={e => ref?.current.click()}
                        >
                            <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-[12px] text-gray-400 text-center">Choose Images</div>
                        </div>

                        <div className="w-[100px] h-[100px] relative mr-2">
                            {files && <div className="absolute w-[100px] h-[100px]">
                                <div className="flex items-center justify-start">
                                    {Array.from(files).map((file, index) => (
                                        <div key={index} className="relative w-[100px] h-[100px] mx-2">
                                            <div className="relative w-[100px] h-[100px] cursor-pointer" title="View image" onClick={e => handleClickOnImage(file)}>
                                                <img src={URL.createObjectURL(file.file)} className="w-[100px] h-[100px] mr-2" />
                                            </div>
                                            {file.status === 'uploading' && <div className="absolute top-0 w-[100px] h-[100px] bg-[#000000aa] opacity-[0.9]"><img src={AppImages.loading} alt="loading" className="w-[25px] h-[25px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] svg-white" /></div>}
                                            {file.status !== 'uploading' && <div className="absolute top-[-10px] right-[0px] bg-white border-[1px] rounded-full cursor-pointer" title="Delete" onClick={e => handleClickOnDeleteBtn(file)}><img src={AppImages.close} alt="delete" className="w-[15px] h-[15px]" /></div>}
                                        </div>
                                    ))}
                                </div>
                            </div>}
                        </div>
                    </div>
                    <input 
                        type="file" 
                        name="category_ads_images" 
                        id="category_ads_images" 
                        multiple 
                        accept="image/png,image/jpg,image/jpeg,image/gif" 
                        className="hidden"
                        ref={ref}
                        onChange={handleOnChange}
                    />
                </div>
            }
        </div>
    );
}

export default CategoryAdImageUploader;