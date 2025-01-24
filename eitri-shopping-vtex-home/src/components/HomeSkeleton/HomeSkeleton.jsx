export default function HomeSkeleton (props) {

  const { show } = props

  return (
    <View
      padding='large'
      display={show ? 'block' : 'none'}>
      <View
        direction='column'
        gap={16}>
        <View
          mode='skeleton'
          width='100%'
          height='100vw'
          borderRadius='small'
        />
        <View
          direction='row'
          gap={16}>
          <View
            mode='skeleton'
            width='100%'
            height={80}
            borderRadius='small'
          />
          <View
            mode='skeleton'
            width='100%'
            height={80}
            borderRadius='small'
          />
          <View
            mode='skeleton'
            width='100%'
            height={80}
            borderRadius='small'
          />
        </View>
        <View
          mode='skeleton'
          width='100%'
          height='100vw'
          borderRadius='small'
        />
      </View>
    </View>
  )
}
