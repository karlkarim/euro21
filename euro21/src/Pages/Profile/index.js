import { useStoreActions, useStoreState } from 'easy-peasy';
import { useState } from 'react';
import http from '../../http';
import defaultAvatar from '../../assets/default.png'
const ProfilePage = () => {
  const [avatar, setAvatar] = useState('');
  const [preview, setPreview] = useState('');
  const { userdata } = useStoreState(state => state.user)
  const { resumeLogin } = useStoreActions(action => action.user)
  const fileUpload = async() => {
    const formData = new FormData();
    formData.append("file", avatar);
    // formData.append("text", "additional info");
    const config = {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    };
    const upload = await http.post('/media', formData, config);
    if(upload.status === 201) {
      console.log(upload.data.data.fileURL)
      const updateUseAvatar = await http.put('/users', {avatar:upload.data.data.fileURL}, {params: {uniqueId: userdata.uniqueId, strategy: 'merge'}})
      if(updateUseAvatar.status === 201) { 
        resumeLogin()
      }
    }
  }
  const selectFiles = (e) => {
    const img = e.target.files[0] 
    setAvatar(img)
    if(img) {
      setPreview(URL.createObjectURL(e.target.files[0]))
    }
  }
  const openFileSelector = () => {
    const fileUpl = document.querySelector("#fileUpl");
    fileUpl.click();
  };
  
  return ( 
    <div className='grid gap-6'>
      <div className='w-24 h-24'>
        <img className='object-cover w-24 h-24 rounded-full ' src={preview ? preview :userdata?.data.avatar ? userdata.data.avatar : defaultAvatar} alt=''/>
      </div>
      <input
            id="fileUpl"
            type="file"
            accept="image/*"
            onChange={(e) => selectFiles(e)}
            hidden
          />
          <div className='flex space-x-2'>
            <button className='px-2 py-1 text-sm text-white transition-all ease-out rounded-md bg-uefa-dark hover:bg-uefa-light' onClick={() => openFileSelector()}>pick image</button>
            {preview &&
              <button className='px-2 py-1 text-sm text-white transition-all ease-out rounded-md bg-uefa-dark hover:bg-uefa-light' onClick={() => fileUpload()}>upload</button>
            }
          </div>
    </div>
   );
}
 
export default ProfilePage;