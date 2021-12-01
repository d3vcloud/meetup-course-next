import { useRouter } from 'next/router';
import Image from 'next/image';

import Card from '../ui/Card';
import classes from './MeetupItem.module.css';

function MeetupItem(props) {

  const router = useRouter();

  const { image, title, address, id } = props;

  const showDetailsHandler = () => {
    router.push('/meetup/' + id);
  }

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <Image src={image} alt={title} width={400} height={500}/>
        </div>
        <div className={classes.content}>
          <h3>{title}</h3>
          <address>{address}</address>
        </div>
        <div className={classes.actions}>
          <button onClick={ showDetailsHandler }>Show Details</button>
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;