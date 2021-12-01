import Head from 'next/head';

import { useRouter } from 'next/router';

import NewMeetupForm from '../../components/meetups/NewMeetupForm';

const NewMeetup = () => {

  const router = useRouter();
  
  const addMeetupHandler = async (meetupData) => {
    const response = await fetch('/api/meetup',{
      method: 'POST',
      body: JSON.stringify(meetupData),
      headers: {
        'Content-type': 'application/json'
      }
    });

    await response.json();

    router.push('/');
  }
  
  return (
    <>
      <Head>
        <title>Add a New Meetup</title>
        <meta name='description' content='Add your own meetup and create amazing networking opportunities'/>
      </Head>
      <NewMeetupForm onAddMeetup={ addMeetupHandler }/>
    </>
  )
}

export default NewMeetup;
