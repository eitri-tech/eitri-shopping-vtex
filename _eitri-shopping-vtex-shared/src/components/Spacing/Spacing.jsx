export default function Spacing(props) {

    const { height, width } = props

    return (
        <View
            width={width || '100%'}
            height={height || '50px'}
        ></View>
    )
}
