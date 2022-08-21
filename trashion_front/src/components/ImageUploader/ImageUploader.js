import React, { useState, useEffect } from 'react';
import { PostButton } from 'components';
import axios from 'axios';
import './ImageUploader.css';

const ImageUploader = () => {
  const [image, setImage] = useState({
    image_file: '',
    preview_URL: '../../img/preview.png',
  });

  let inputRef;

  const saveImage = (e) => {
    e.preventDefault();

    if (e.target.files[0]) {
      // 새로운 이미지를 올리면 createObjectURL()을 통해 생성한 기존 URL을 폐기
      URL.revokeObjectURL(image.preview_URL);
      const preview_URL = URL.createObjectURL(e.target.files[0]);
      setImage(() => ({
        image_file: e.target.files[0],
        preview_URL: preview_URL,
      }));
    }
  };

  const deleteImage = () => {
    // createObjectURL()을 통해 생성한 기존 URL을 폐기
    URL.revokeObjectURL(image.preview_URL);
    setImage({
      image_file: '',
      preview_URL: '../../img/preview.png',
    });
  };

  useEffect(() => {
    // 컴포넌트가 언마운트되면 createObjectURL()을 통해 생성한 기존 URL을 폐기
    return () => {
      URL.revokeObjectURL(image.preview_URL);
    };
  }, []);

  const sendImageToServer = async () => {
    if (image.image_file) {
      const formData = new FormData();
      formData.append('file', image.image_file);
      await axios.post('/api/image/uplad', formData);
      alert('사진 등록 완료!');
      setImage({
        image_file: '',
        preview_URL: '../../img/preview.png',
      });
    } else {
      alert('사진을 등록해주세요!');
    }
  };

  return (
    <div className="uploader-wrapper">
      <input
        type="file"
        accept="image/*"
        onChange={saveImage}
        // 클릭할 때 마다 file input의 value를 초기화 하지 않으면 버그가 발생할 수 있다
        // 사진 등록을 두개 띄우고 첫번째에 사진을 올리고 지우고 두번째에 같은 사진을 올리면 그 값이 남아있음!
        onClick={(e) => (e.target.value = null)}
        ref={(refParam) => (inputRef = refParam)}
        style={{ display: 'none' }}
      />
      <div className="img-wrapper">
        <img src={image.preview_URL} />
      </div>

      <div className="upload-button">
        <PostButton text={'이미지 선택'} onClick={() => inputRef.click()} />
        <PostButton text={'이미지 삭제'} onClick={deleteImage} />
        <PostButton text={'이미지 업로드'} onClick={sendImageToServer} />
      </div>
    </div>
  );
};

export default ImageUploader;
