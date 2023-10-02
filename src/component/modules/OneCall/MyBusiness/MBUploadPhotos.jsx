import { useRef, useState } from "react";
import { AppImages } from "../../../../Asset/images/image.js";
import { BiImageAdd, MdCloudUpload } from "react-icons/bi"

function MBUploadPhotos() {
  const ref = useRef(null)
  const [files, setFiles] = useState([])

  function handleClickOnDeleteBtn(file) {
    setFiles(files.filter(item => item !== file))
  }

  function handleOnChange(e) {
    let newFiles = []
    if(e.target.files) {
      newFiles = Array.from(e.target.files).map(file => ({
        file: file,
        status: 'uploaded'
      }))
      setFiles([...files, ...newFiles])
    }
    console.log(newFiles.length)
    if(newFiles.length) {
      newFiles.forEach(file => {
        // uploadFileOnFirebase(
        //   file,
        //   {
        //     onSuccess: (url) => {
        //       file.download_url = url 
        //       file.status = 'uploaded'
        //       setFiles([...files, ...newFiles])
        //       if(typeof check_post_ad_files === 'function') {
        //           check_post_ad_files([...files, ...newFiles])
        //       }
        //     },
        //     onProgress: progress => {
        //       file.upload_progress = progress 
        //       setFiles([...files, ...newFiles])
        //     }
        //   }
        // )
      })
    }
  } 
  return (  
    <div className="mx-2 my-2">
      {
          // isUploading ? <img src={AppImages.loading} alt="loading" className="w-[25px] h-[25px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]" />
          // :
          <div className="my-4">
              <div className="flex items-start overflow-x-auto">
                  <div 
                    className="w-[100px] h-[100px] mr-2 border-[1px] rounded border-black relative  cursor-pointer"
                    onClick={e => ref?.current.click()}
                  >
                    <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-[10px]  text-center">
                      <BiImageAdd className="mx-auto" size={"20px"} />
                      <span>Upload Business Images</span>
                    </div>
                  </div>

                  <div className="relative mr-2 ">
                    {files && <div className="absolute w-[100px] h-[100px]">
                      <div className="flex items-center justify-start ">
                        {Array.from(files).map((file, index) => (
                          <div key={index} className="relative w-[100px] h-[100px] mx-2">
                            <div className="relative w-[100px] h-[100px] cursor-pointer" title="View image">
                              <img src={URL.createObjectURL(file.file)} className="w-[100px] h-[100px] mr-2" />
                            </div>
                            {file.status === 'uploading' && <div className="absolute top-0 w-[100px] h-[100px] bg-[#000000aa] opacity-[0.9]"><img src={AppImages.loading} alt="loading" className="w-[25px] h-[25px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] svg-white" /></div>}
                            {file.status !== 'uploading' && <div className="absolute top-[0px] right-[0px] bg-white border-[1px] rounded-full cursor-pointer" title="Delete" onClick={e => handleClickOnDeleteBtn(file)}><img src={AppImages.close} alt="delete" className="w-[15px] h-[15px]" /></div>}
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

export default MBUploadPhotos;