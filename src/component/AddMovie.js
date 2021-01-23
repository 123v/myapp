import React, { Component } from 'react'
import { Input, Modal, Upload, Form, Button, DatePicker, Select, message } from "antd";
import { CloseCircleFilled, UploadOutlined } from "@ant-design/icons";

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
}

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const { Option } = Select;

export default class AddMovie extends Component {
    formRef = React.createRef();
    constructor(props) {
        super(props)

        //state
        this.state = {
            image_url: '',
            movie_name: '',
            sub_title: '',
            release_date: new Date(),
            desc: '',
            genre: '',
            file: {},
            duration: null,
            tags: [],
            genres: [],
            box_office: null,
            vote_average: null
        }
    }

    //Number Validation
    isNumber = (evt) => {
        if ((evt.which !== 8 && evt.which !== 0 && evt.which < 48) || evt.which > 57) {
            evt.preventDefault();
        }
    };

    //Decimal Number Validation
    isDecimal = (evt) => {
        if (evt.which == 46) {
            if (evt.target.value.indexOf('.') != -1) {
                evt.preventDefault();
            }
        } else if ((evt.which != 8 && evt.which != 0) && (evt.which < 48 || evt.which > 57)) {
            evt.preventDefault();
        }
    };

    //Albhabet validation
    isAlfa = (e) => {
        var charCode = e.which;
        if (!(charCode >= 65 && charCode <= 122) && charCode !== 32 && charCode !== 0 && charCode !== 8) {
            e.preventDefault();
        }
    }
    
    //uploading the image
    uploadImages = (value) => {
        const reader = new FileReader();
        reader.addEventListener('load', (e) => {
            this.setState({ image_url: e.target.result, file: value })
        });
        reader.readAsDataURL(value);
    }

    //formating the date - yyyy-mm-dd
    formatDate = async (date) => {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }

    /**
     * main submit function
     * @param {*} value //form values
     */
    submit = async (value) => {
        try {
            if (this.state.image_url !== '') {
                let obj = {
                    id: this.props.total + 1,
                    image: this.state.image_url,
                    movie_name: this.state.movie_name,
                    title: this.state.movie_name,
                    sub_title: this.state.sub_title,
                    desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`,
                    release_date: await this.formatDate(this.state.release_date),
                    release_year: '2005',
                    running_time: this.state.duration,
                    box_office: this.state.box_office,
                    vote_average: this.state.vote_average,
                    genre: this.state.genres,
                    genre_desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry`,
                    tags: this.state.tags
                }
                this.props.getData(obj)
                await this.formRef.current.resetFields()
                this.props.onCancel()
                message.success('Movie added successfully');
            } else {
                message.error('Please upload the image of movie.');
            }

            return  'done'
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * render method
     */
    render() {

        //form's initial values
        const initialValues = {
            movie_name: this.state.movie_name,
            duration: this.state.duration,
            release_date: this.state.release_date,
            tags: this.state.tags,
            genres: this.state.genres,
            box_office: this.state.box_office,
            vote_average: this.state.vote_average
        }

        return (
            <Modal
                visible={this.props.visible}
                onCancel={this.props.onCancel}
                title="Add Movie"
                footer={null}
                width={'50%'}
            >
                <Form
                    {...layout}
                    id="myForm"
                    onFinish={this.submit}
                    initialValues={initialValues}
                    ref={this.formRef}
                >
                    <Form.Item
                        label="Movie Name"
                        name={'movie_name'}
                        rules={[
                            {
                                required: true,
                                whitespace: true,
                                message: 'Please input your movie name',
                            },
                        ]}
                    >
                        <Input placeholder="Movie Name" onChange={(e) => this.setState({ movie_name: e.target.value })} />
                    </Form.Item>
                    <Form.Item
                        label="Duration"
                        name={'duration'}
                        rules={[
                            {
                                required: true,
                                whitespace: true,
                                message: 'Please input your movie duration',
                            },
                        ]}
                    >
                        <Input placeholder="Movie Duration" onChange={(e) => this.setState({ duration: e.target.value })} onKeyPress={this.isNumber} />
                    </Form.Item>
                    <Form.Item 
                        label="Releasing Date"
                        rules={[
                            {required: true}
                        ]}
                    >
                        <DatePicker />
                    </Form.Item>
                    <Form.Item 
                        label="Genre"
                        rules={[
                            {required: true, whitespace: true}
                        ]}
                    >
                        <Select mode="tags" placeholder="Genres" onChange={(genres) => this.setState({genres})}>
                            {
                                this.state.genres.map((item, index) => (
                                    <Option key={index} value={item}>{item}</Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item 
                        label="Tags"
                        rules={[
                            {required: true, whitespace: true}
                        ]}
                    >
                        <Select mode="tags" placeholder="Tags" onChange={(tags) => this.setState({tags})}>
                            {
                                this.state.tags.map((item, index) => (
                                    <Option key={index} value={item}>{item}</Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item 
                        label="Box Office"
                        rules={[
                            {required: true, whitespace: true}
                        ]}
                    >
                        <Input placeholder="Box Office" onChange={(e) => this.setState({ box_office: e.target.value })} onKeyPress={this.isNumber} />
                    </Form.Item>
                    <Form.Item 
                        label="Vote Average"
                        rules={[
                            {required: true, whitespace: true}
                        ]}
                    >
                        <Input placeholder="Vote Average" onChange={(e) => this.setState({ vote_average: e.target.value })} onKeyPress={this.isDecimal} />
                    </Form.Item>
                    <Form.Item name="dragger" {...tailLayout}>
                        <div className="upload-container">
                            {
                                this.state.image_url ?
                                    <div className="image-container">
                                        <img height={300} width={'100%'} src={this.state.image_url} alt={"uploaded cap"} />
                                        <CloseCircleFilled className="close-icon" onClick={() => this.setState({ image_url: '', file: {} })} />
                                    </div>
                                    :
                                    <Upload.Dragger
                                        className="upload-button"
                                        multiple={false}
                                        showUploadList={false}
                                        customRequest={(e) => this.uploadImages(e.file)}
                                    >
                                        <UploadOutlined />
                                    </Upload.Dragger>
                            }
                        </div>
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" onClick={() => {}} htmlType="submit">Add</Button>
                        <Button onClick={async () => {
                            await this.formRef.current.resetFields()
                            this.props.onCancel()
                        }}>Cancel</Button>
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}
