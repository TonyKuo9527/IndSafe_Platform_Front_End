<template>
    <CContainer>
        <CRow>
            <CCard>
                <CCardBody>
                    <h2>Camera Live
                        <CButton @click="init()">
                            <CIcon name="cil-sync" />
                            Update
                        </CButton>
                    </h2>

                    <CRow>
                        <CCol :lg="3" v-for="item in cameraList" :key="item.index">
                            <CCard class="text-center">
                                <CCardBody>
                                    <CCardTitle> {{ item.cameraID }} </CCardTitle>
                                    <CButton color="info" @click="showLiveModel(item)">
                                        <CIcon name="cil-tv" /> Live
                                    </CButton>
                                </CCardBody>
                            </CCard>
                        </CCol>

                    </CRow>
                </CCardBody>

                <CModal alignment="center" size="lg" :visible="liveModel" @close="() => { liveModel = false; reload() }">
                    <CModalHeader>
                        <CModalTitle>Live</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        <CFormLabel>ChannelName</CFormLabel>
                        <CFormInput id="channelName" v-model="channelName" disabled />
                        <CFormLabel>CameraID</CFormLabel>
                        <CFormInput id="CameraID" v-model="cameraID" disabled />
                        <CFormLabel>RTSP Live</CFormLabel>
                        <div class="clearfix">
                            <CImage fluid rounded :src="rtsp" />
                        </div>
                    </CModalBody>
                    <CModalFooter>
                        <CButton color="secondary" @click="() => { liveModel = false; reload() }">
                            <CIcon name="cil-X" /> Close
                        </CButton>
                    </CModalFooter>
                </CModal>

                <CToaster placement="top-end">
                    <CToast v-for="toast in toasts" :key="toast.index" :delay="3000">
                        <CToastHeader closeButton>
                            <span class="me-auto fw-bold">{{ toast.title }}</span>
                        </CToastHeader>
                        <CToastBody>
                            {{ toast.content }}
                        </CToastBody>
                    </CToast>
                </CToaster>

            </CCard>
        </CRow>
    </CContainer>
</template>

<script>
import request from '@/utils/request';
export default {
    name: "AlertList",
    data() {
        return {
            data: [],
            pages: 0,
            page: 1,
            size: 5,


            liveModel: false,

            cameraList: [],

            channelName: "",
            cameraName: "",
            rtsp: "",

            buffer: false,

            toasts: []
        };
    },
    mounted() {
        this.checkJWT();
    },
    methods: {
        checkJWT() {
            if (!this.$store.state.jwt) {
                this.$router.push("/dashboard");
                return
            }

            request({
                method: 'POST',
                url: '/auth/checkJWT',
                headers: {
                    authorization: this.$store.state.jwt
                }
            })
                .then(res => {
                    let result = res.data;

                    if (result.status) {
                        this.init();
                    } else {
                        this.toasts.push({
                            title: 'Error',
                            content: '登入金鑰已過期，請重新登入!'
                        });
                        this.$router.push("/dashboard");
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },

        init() {
            request({
                method: 'GET',
                url: '/camera/' + this.$store.state.userToken
            })
                .then(res => {
                    let result = res.data;

                    this.cameraList = [];

                    switch (result.status) {
                        case 1:
                            this.cameraList = result.data;
                            break;

                        case 0:
                            this.toasts.push({
                                title: 'Error',
                                content: '系統錯誤，請與管理者聯繫',
                            });
                            break;

                        case 102:
                            this.toasts.push({
                                title: 'Error',
                                content: 'token錯誤，請重新登入',
                            })
                            break;

                    };
                })
                .catch(err => {
                    console.log(err);
                });
        },

        showLiveModel(item) {
            this.channelName = item.channelName;
            this.cameraID = item.cameraID;
            this.rtsp = "https://rtsp.jp.ngrok.io/video_feed/" + item.cameraID;

            this.liveModel = true;
        },

        reload() {
            console.log('reload')
            window.location.reload();
        },
    },
}
</script>