import Head from 'next/head';

import MeetupDetail from '../../components/meetups/MeetupDetail';

const MeetupDetails = ({ meetupData }) => {

  const { image, title, address, description } = meetupData;
  return (
    <>
      <Head>
        <title>{ title }</title>
        <meta name='description' content={ description }/>
      </Head>
      <MeetupDetail 
        image={ image }
        title={ title }
        address={ address }
        description={ description }
        />
    </>
  )
}

export async function getStaticProps(context) {
  //fetch data for a single meetup
  const meetupId = context.params.id;

  const response = await fetch(`http://localhost:3000/api/meetup/${ meetupId }`);

  const { selectedMeetup } = await response.json();
  

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description
      }
    }
  }
}

/**
  Generate static pages for all suported ids
  If fallback is false and user entered an "ID" is not in array of paths,
  the page will show us 404 error. 
  Otherwise, next js generate new page for every incoming request
 */
export async function getStaticPaths(){

  const response = await fetch("http://localhost:3000/api/meetup/ids");

  const { meetupsIds } = await response.json();
  
  return {
    fallback: false, //true or blocking
    paths: meetupsIds
    // paths: [
    //   {
    //     params: { 
    //       id: 'm1'
    //     }
    //   }
    // ]
  }
}

export default MeetupDetails;