import Head from "next/head";

import MeetupList from "../components/meetups/MeetupList";

// const DUMMY_MEETUPS = [
//   {
//     id: "m1",
//     title: "A first meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Avinguda_de_la_Reina_Maria_Cristina_Barcelona_2013_edited.jpeg/800px-Avinguda_de_la_Reina_Maria_Cristina_Barcelona_2013_edited.jpeg",
//     adddress: "Some address 5, 1222 Some City",
//     description: "This is a first meetup",
//   },
// ];

const Home = ({ meetups }) => {
  return (
    <>
      <Head>
        <title>Next Meetups</title>
        <meta name="description" content="List all amazing meetups" />
      </Head>
      <MeetupList meetups={meetups} />
    </>
  );
};

//This function executes on the server after deployment
//This function receives context
// export async function getServerSideProps(context){
//   const req = context.req;
//   const res = context.res;
//   //fetch data from an API
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   }
// }

// This funcion executes during build process
//We will use this method when data not changed multiple times
//This approach is better and faster
export async function getStaticProps() {
  const response = await fetch("http://localhost:3000/api/meetup");

  const { meetups } = await response.json();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    //We will use revalidate when we have data that change frequently
    //This unlock a feature called incremental static generation
    //The number 10 indicates that page will wait until it regenerates this page
    revalidate: 10,
  };
}

export default Home;
