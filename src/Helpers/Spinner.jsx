import { Flex, Spin } from 'antd';

const Spinner = () => {

    const contentStyle = {
        padding: 40,
    };



    return (
        <Flex gap="middle" vertical
            justify="center"
            align="center"
            style={{
                height: '80vh',   // заема целия екран
                width: '90vw',
            }}
        >
            <Flex gap="middle">

                <Spin tip="Loading" size="large">
                    <div style={contentStyle}></div>
                </Spin>
            </Flex>

        </Flex>
    )
}

export default Spinner
