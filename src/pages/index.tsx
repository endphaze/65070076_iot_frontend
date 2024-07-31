import Layout from "../components/layout";
import cafeBackgroundImage from "../assets/images/bg-cafe-1.jpg";
import profileImage from "../assets/images/profile.jpg";
import coffeeImage from "../assets/images/coffee-1.jpg";

export default function HomePage() {
  return (
    <Layout>
      <section
        className="h-[500px] w-full text-white bg-orange-800 bg-cover bg-blend-multiply flex flex-col justify-center items-center px-4 text-center"
        style={{
          backgroundImage: `url(${cafeBackgroundImage})`,
        }}
      >
        <h1 className="text-5xl mb-2">ยินดีต้อนรับสู่ IoT Library & Cafe</h1>
        <h2>ร้านกาแฟที่มีหนังสืออยู่นิดหน่อยให้คุณได้อ่าน</h2>
      </section>

      <section className="container mx-auto py-8">
        <h1>เกี่ยวกับเรา</h1>

        <div className="grid grid-cols-3 gap-4" >
          <p  className="text-left col-span-2 mb-20 color" style={{color: "grey"}}>
            IoT Library & Cafe เป็นร้านกาแฟที่มีหนังสืออยู่นิดหน่อยให้คุณได้อ่าน
            และเรียนรู้เรื่องใหม่ๆ ที่เกี่ยวกับเทคโนโลยี IoT โดยคาเฟ่ของเรานั้น ก่อตั้งขึ้นโดย
            ผศ.ดร. ปานวิทย์ ธุวะนุติ ซึ่งเป็นอาจารย์ในวิชา Internet of Things และนายกฤตณัฏฐ์
            ศิริพรนพคุณ เป็นผู้ช่วยสอนในหัวข้อ FastAPI และ React ในวิชานี้
            
            <p style={{color: "black"}}>
              ปัจจุบันค่าเฟ่ และห้องสมุดของเรา อยู่ในช่วงการดูแลของ นาย ณัฐนนท์ วงศ์หนองแวง 
            รหัสประจำตัวนักศึกษา 65070076 โดยตัวเว็บไซต์
            ยังไม่นำระบบแก้ไขหนังสือหรือลบหนังสือมาใส่ 
            แต่สามารถกดเพิ่มหนังสือและเพิ่มรายละเอียดหนังสือและเรื่องย่อกับประเภทหนังสือได้แล้ว
            </p>
          </p>
         
          
          <div>
          
            <img src={profileImage} alt="Panwit Tuwanut" className="h-full w-full object-cover" />
           
          </div>
          
        </div>
        
       
        
       
      </section>

      <section className="w-full flex justify-center">
        <img src={coffeeImage} alt="Coffee" className="w-full" />
      </section>
    </Layout>
  );
}
