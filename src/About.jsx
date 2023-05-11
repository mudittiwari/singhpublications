import author from './assets/author.png';
import about from './assets/about.png';
import { useEffect } from 'react';

function About() {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    return (
        <>
         <h1 className="text-2xl font-bold mb-5 mx-auto w-max mt-10" style={{ 'color': '#315ED2' }}>About the Author</h1>
            <div className='flex w-full md:flex-row flex-col'>
           
                <div className='w-full items-center justify-start lg:w-1/3 py-8 px-8 lg:p-8 flex flex-col'>
                    <img src={author} className="w-4/5 mt-4" alt="..." />

                </div>
                <div className='w-full  py-0 px-8 lg:p-8 '>
                    <h1 className='font-bold text-xl mt-3' style={{ 'color': '#315ED2' }}>Dr. (Prof) Sher Singh Morodiya</h1>
                    <h1 className='font-semibold text-sm mb-3' style={{ 'color': '#315ED2' }}>Director & Author (Singh Publication)</h1>
                    <p className='text-sm font-medium mb-10'>
                        Prof. (Dr.) Sher Singh Morodiya completed Diploma in General Nursing in 1983 from Government School of Nursing, S.K. Hospital, Sikar (Rajasthan). He got his B.Sc. Nursing Degree in 2004 from IGNOU, New Delhi. He received his Master of Nursing Degree (Medical Surgical Nursing) in 2008 from Raj Kumari Amrit Kaur College of Nursing, University of Delhi. He has been awarded Ph.D. Degree in 2013 from Pacific Academy of Higher Education and Research University, Udaipur, Rajasthan. Apart from the Nursing field, he completed Bachelor's Degree in Arts and Master's Degree in Arts (English) from University of Rajasthan. He got MBA Degree in Hospital Management from Algappa University, Tamilnadu. He completed Master's Degree in Arts (Distance Education) from IGNOU. He also did Post-Graduation Diploma in Distance Education and Post-Graduation Diploma in Higher Education from IGNOU. He was awarded Post Graduation Diploma in Theology from Dayalbagh Educational Institute, Agra (U.P.) and Bachelor's Degree in Journalism and Mass Communication from Vardhman Mahaveer Open University, Kota (Rajasthan). Experience: He started his career after General Nursing Diploma as Nurse Grade II (Basic Nurse) at Government dispensary in 1984. He worked at various health care settings i.e. Primary Health Centre, Community Health Centre, District Hospital and Medical College Hospital in various capacities as Basic nurse, Nurse Manager/ Ward In-charge, Nursing Superintendent. He experienced as Lecturer and Founder Principal, Government Colleges of Nursing and engaged in Under Graduate and Post Graduate programmes. He got chance to work on the post of the Officer on Special Duty to the Additional Chief Secretary (Medical & Health) along with the responsibility of Deputy Director (Nursing) i.e. highest post in Government of Rajasthan for nursing personnel. He is having 39 Years of experience in the field of Nursing. He has lot of confidence in area of teaching, guiding, examining/evaluating, care of clients, research and management/administration at various levels of health care settings. Now he is working as Professor, Principal & Dean, Faculty of Nursing, Apex university, Jaipur. Here, he is also registered as research supervisor/guide for Doctoral Programmes. He is authour of one book named; "Performance Appraisal of Nursing Personnel (Issues and Challenges)." He has been translated six nursing books from English to Hindi. He is Editor-in-Chief of International Journal of Medical Surgical Nursing and member of editorial board in seven peer reviewed/refereed journals from India and two foreign (USA) journals. He published 26 articles in International & National Journals, one Article Published in Conference Proceeding Book, eight articles published in News Papers. He has been presented seven research papers in International Conferences and four in National conferences. He has received BEST PAPER AWARD in an International Conference held at Pacific University, Udaipur in 2019. He is life time member in ten professional bodies.

                    </p>
                </div>
            </div>
            <h1 className="text-2xl font-bold mb-5 mx-auto w-max mt-5" style={{ 'color': '#315ED2' }}>From the Publication</h1>
            <div className='flex w-full md:flex-row flex-col'>
                <div className='w-full items-center justify-start lg:w-1/3 py-8 px-8 lg:p-8 flex flex-col'>
                    <img src={about} className="w-4/5 mt-4" alt="..." />

                </div>
                <div className='w-full  py-0 px-8 lg:p-8 '>
                    
                    <p className='text-sm font-medium mb-10'>
                    It gives us immense pleasure to share with you that "Singh Publication" is a new initiative in field of publication. Keeping in mind, the New Education Policy of our country and changing trends in nursing education, "Singh publication" have taken up a mission of such books, those will student-friendly, syllabus based, written by subject experts in whole country. In this light, the Singh Publication aimed to those students who are unable to understand the books available in difficult English language. To fulfil this gap, it has been published first easily understandable book, named, "A concise Book of Nursing Research & Statistics." The author of this book as well as initiator of the publication is one person who has lot of experience in areas of clinical, teaching, guiding, research, writing, editing, translating and administration/ management in government as well as private sector. The growth of the publication cannot possible without invaluable contribution of reader, author, reviewer, contributor and recommender, these all are pillars of any publication. We need your support and contributions. We will happy and grateful to you if you join hands with us in form of author, contributor and reviewer. Let's us join together and share ideas and knowledge in field of your expertness. We are looking forward to your cooperation in future as well. Share your CV to singhpublicationjaipur@gmail.com

                    </p>
                </div>
            </div>
        </>
    );
}
export default About;