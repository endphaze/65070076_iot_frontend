import Layout from "../components/layout";
import cafeBackgroundImage from "../assets/images/bg-cafe-2.jpg";
import useSWR from "swr";
import { OrderDetail } from "../lib/models";
import { Coffee } from "../lib/models";
import Loading from "../components/loading";
import { Alert} from "@mantine/core";
import { IconAlertTriangleFilled } from "@tabler/icons-react";


export default function BooksPage() {
  const { data: sho, error } = useSWR<OrderDetail[]>("/orderDetail");
  const { data:hardstuckplatinum3} = useSWR<Coffee[]>("/coffees");

  const menu = new Map<number, string>();
  if (hardstuckplatinum3){
    hardstuckplatinum3.forEach(cof => menu.set(cof.id, cof.name));
  }
  
  return (
    <>
      <Layout>
        <section
          className="h-[100px] w-full text-white bg-orange-800 bg-cover bg-blend-multiply flex flex-col justify-center items-center px-4 text-center"
          style={{
            backgroundImage: `url(${cafeBackgroundImage})`,
          }}
        >
          <h1 className="text-5xl mb-2">รายการสั่งเครื่องดื่ม</h1>
        </section>

        <section className="container mx-auto py-8">
         

          {!sho && !error && <Loading />}
          {error && (
            <Alert
              color="red"
              title="เกิดข้อผิดพลาดในการอ่านข้อมูล"
              icon={<IconAlertTriangleFilled />}
            >
              {error.message}
            </Alert>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {sho?.map((orderDetail) => (
              <div className="border border-solid border-neutral-200" key={orderDetail.id}>
                
                <div className="p-4">
                <h2 className="text-lg font-semibold line-clamp-2">ออเดอร์ที่ {orderDetail.order_id}</h2>
                <h2 className="text-lg font-semibold line-clamp-2">สั่ง {menu.get(orderDetail.coffee_id)}</h2>
                  <h2 className="text-lg font-semibold line-clamp-2">จำนวน {orderDetail.quantity} แก้ว</h2>
                  {/* <p className="text-xs text-neutral-500">ราคา {order_coffee.total}</p> */}
                </div>
              </div>
            ))}
          </div>
        </section>
      </Layout>
    </>
  );
}
