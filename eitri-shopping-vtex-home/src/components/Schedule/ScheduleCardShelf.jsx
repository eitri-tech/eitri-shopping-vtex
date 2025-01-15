import SwiperContent from '../SwiperContent'
import ScheduleCard from './ScheduleCard'

export default function ScheduleCardShelf(props) {
	const { data } = props

	if (data) {
		return (
			<SwiperContent
				title={data.title}
				paddingHorizontal='large'>
				{data?.shelves.map((item, index) => {
					return (
						<ScheduleCard
							key={`${item.date}-${index}`}
							date={item.date}
							title={item.title}
							description={item.description}
							mode={item.mode}
							link={item.actionLink}
						/>
					)
				})}
			</SwiperContent>
		)
	}
}
