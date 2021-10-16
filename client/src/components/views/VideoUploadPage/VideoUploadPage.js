import React, { useState } from 'react'
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import Dropzone from 'react-dropzone';
import Axios from 'axios';
import { useSelector } from 'react-redux';
import { FaThumbsUp } from 'react-icons/fa';

function VideoUploadPage(props) {
  const { Title } = Typography;
  const { TextArea } = Input;

  const PrivateOptions = [
    {value: 0, label: 'Private'},
    {value: 1, label: 'Public'}
  ];
  
  const CategoryOptions = [
    {value: 0, label: 'Film & Animation'},
    {value: 1, label: 'Autos & Vehicles'},
    {value: 2, label: 'Music'},
    {value: 3, label: 'Pets & Animals'}
  ];
  
  const [VedioTitle, setVedioTitle] = useState();
  const [Description, setDescription] = useState();
  const [Private, setPrivate] = useState(0);
  const [Category, setCategory] = useState('Film & Animation');
  const [FilePath, setFilePath] = useState('');
  const [Duration, setDuration] = useState('');
  const [ThumbnailPath, setThumbnailPath] = useState('');

  const user = useSelector(state => state.user);

  const onTitleChange = (e) => {
    setVedioTitle(e.currentTarget.value);
  }

  const onDescriptionChange = (e) => {
    setDescription(e.currentTarget.value);
  }

  const onPrivateChange = (e) => {
    setVedioTitle(e.currentTarget.value);
  }

  const onCategoryChange = (e) => {
    setDescription(e.currentTarget.value);
  }

  const onDrop = (files) => {
    const formData = new FormData();
    const config = {
        header: { 'content-type': 'multipart/form-data' }
    }
    formData.append("file", files[0])

    Axios.post('/api/video/uploadfiles', formData, config)
      .then(res => {
        if (res.data.success) {
          setFilePath(res.data.url);
          const variables = {
            url: res.data.url,
            fileName: res.data.fileName
          }
          Axios.post('/api/video/thumbnail', variables)
            .then(res => {
              if (res.data.success) {
                setDuration(res.data.fileDuration);
                setThumbnailPath(res.data.thumbsFilePath);
              } else {
                alert('Failed to get thumbnail.')
              }
            })
        } else {
          alert('Failed to upload.');
        }
      })
  }
  
  const onSubmit = (e) => {
    e.preventDefault();
    const variables = {
      writer: user.userData._id,
      title: VedioTitle,
      description: Description,
      privacy: Private,
      filePath: FilePath,
      category: Category,
      duration: Duration,
      thumbnail: ThumbnailPath
    }

    Axios.post('/api/video/uploadVideo', variables)
      .then(res => {
        if (res.data.success) {
          message.success('Successed to upload.');
          setTimeout(() => {
            props.history.push('/');
          }, 2000)
        } else {
          alert('Failed to submit.')
        }
      })
  }

  return (
    <div style={{ maxWidth:'700px', margin:'2rem auto' }}>
      <div style={{ textAlign:'center', marginBottm:'2rem'}}>
        <Title level={2}>Upload Video</Title>
      </div>

      <Form onSubmit={onSubmit}>
        <div style={{ display:'flex', justifyContent:'space-between'}}>
        <Dropzone
          onDrop={onDrop}
          multiple={false}
          maxSize={800000000000000}>
          {({ getRootProps, getInputProps }) => (
            <div style={{ width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <Icon type="plus" style={{ fontSize: '3rem' }} />

            </div>
          )}
        </Dropzone>

          {ThumbnailPath && 
          <div>
            <img src={`http://localhost:5000/${ThumbnailPath}`} alt="thumbnail" />
          </div>
          }
          
        </div>

        <br />
        <br />
        <label>Title</label>
        <Input
          onChange={onTitleChange}
          value={VedioTitle}
        />

        <br />
        <br />
        <label>Description</label>
        <TextArea
          onChange={onDescriptionChange}
          value={Description}
        />

        <br />
        <br />
        <select onChange={onPrivateChange}>
          {PrivateOptions.map((item, index) => (
            <option key={index} value={item.value}>{item.label}</option>
          ))}
        </select>

        <br />
        <br />
        <select onChange={onCategoryChange}>
          {CategoryOptions.map((item, index) => (
            <option key={index} value={item.value}>{item.label}</option>
          ))}
        </select>

        <br />
        <br />
        <Button type="primary" size="large" onClick={onSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default VideoUploadPage
