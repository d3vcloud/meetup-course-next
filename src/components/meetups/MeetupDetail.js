import Image from "next/image";

import styles from './MeetupDetail.module.css';

const MeetupDetail = (props) => {

  const { image, title, address, description } = props;
  return (
    <section className={ styles.detail }>
      <Image
        src={ image }
        alt="A First Meetup"
        width={500}
        height={500}
      />
      <h1>{ title }</h1>
      <address>{ address }</address>
      <p>{ description }</p>
    </section>
  );
};

export default MeetupDetail;
