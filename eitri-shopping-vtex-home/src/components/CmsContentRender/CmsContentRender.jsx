import {getMappedComponent} from "../../utils/getMappedComponent";
import Eitri from 'eitri-bifrost'

export default function CmsContentRender (props) {

  const { cmsContent } = props

  const [key, setKey] = useState(new Date().getTime())

  useEffect(() => {
    if (cmsContent) {
      Eitri.navigation.setOnResumeListener(() => {
        const currentTime = new Date().getTime()
        setKey(currentTime)
      })
    }
  }, [cmsContent])

  return (
    <View
      paddingBottom='large'
      paddingTop='small'
      direction='column'
      gap={22}>
      {cmsContent?.map(content => getMappedComponent(content, key))}
    </View>
  )
}
