import { Stack } from '@mui/material'
import FileUploader from './FileUploader'
import { useEffect, useState } from 'react'
import { api } from '../../../services/api'

export default function FilesAdministration() {
    const [seleniumJarExists, setSeleniumJarExists] = useState(false)
    const [supervisionFileExists, setSupervisionFileExists] = useState(false)
    const [webDriverAgentFileExists, setWebDriverAgentFileExists] = useState(false)
    const [pemFileExists, setPemFileExists] = useState(false)
    const [mobileProvisionFileExists, setMobileProvisionFileExists] = useState(false)
    const [androidWebRtcFileExists, setAndroidWebRtcFileExists] = useState(false)

    function handleGetFileData() {
        let url = `/admin/files`

        api.get(url)
            .then(response => {
                let files = response.data
                if (files.length !== 0) {
                    for (const file of files) {
                        if (file.name === 'selenium.jar') {
                            setSeleniumJarExists(true)
                        }
                        if (file.name === 'supervision.p12') {
                            setSupervisionFileExists(true)
                        }
                        if (file.name === 'WebDriverAgent.ipa') {
                            setWebDriverAgentFileExists(true)
                        }
                        if (file.name === 'private_key.pem') {
                            setPemFileExists(true)
                        }
                        if (file.name === 'profile.mobileprovision') {
                            setMobileProvisionFileExists(true)
                        }
                        if (file.name === 'gads-webrtc.apk') {
                            setAndroidWebRtcFileExists(true)
                        }
                    }
                }
            })
            .catch(() => {
            })
    }

    useEffect(() => {
        handleGetFileData()
    }, [])

    return (
        <Stack
            style={{
                marginLeft: '20px',
                marginTop: '20px'
            }}
            direction='row'
            spacing={1}
        >
            <FileUploader
                title='Upload Selenium jar'
                description='If you want to connect provider Appium nodes to Selenium Grid instance you need to upload a valid Selenium jar. Version 4.13 is recommended.'
                allowedExtensions={['jar']}
                fileStatus={seleniumJarExists}
                fileName='selenium.jar'
            />
            <FileUploader
                title='Upload supervision profile'
                description='Upload the supervision profile if you are using supervised iOS devices'
                uploadUrl='/admin/upload-supervision-profile'
                allowedExtensions={['p12']}
                fileStatus={supervisionFileExists}
                fileName='supervision.p12'
            />
            <FileUploader
                title='Upload WebDriverAgent IPA'
                description='Upload signed WebDriverAgent IPA file'
                allowedExtensions={['ipa']}
                fileStatus={webDriverAgentFileExists}
                fileName='WebDriverAgent.ipa'
            />
            <FileUploader
                title='Upload GADS WebRTC apk'
                description='Upload prebuilt GADS Android WebRTC apk file'
                allowedExtensions={['apk']}
                fileStatus={androidWebRtcFileExists}
                fileName='gads-webrtc.apk'
            />
        </Stack>
    )
}