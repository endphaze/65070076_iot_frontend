import Layout from "../components/layout";
import cafeBackgroundImage from "../assets/images/bg-cafe-2.jpg";
import useSWR from "swr";
import { Coffee } from "../lib/models";
import Loading from "../components/loading";
import { Alert, Button } from "@mantine/core";
import { IconAlertTriangleFilled} from "@tabler/icons-react";
import { Link } from "react-router-dom";

export default function BooksPage() {
    const { data: coffee, error } = useSWR<Coffee[]>("/coffees");
  
    return (
      <>
        <Layout>
          <section
            className="h-[500px] w-full text-white bg-orange-800 bg-cover bg-blend-multiply flex flex-col justify-center items-center px-4 text-center"
            style={{
              backgroundImage: `url(${cafeBackgroundImage})`,
            }}
          >
            <h1 className="text-5xl mb-2">เมนูกาแฟ</h1>
            <h2>โปรดเลือกให้ดีๆนะครับ</h2>
          </section>
  
          <section className="container mx-auto py-8">
            <div className="flex justify-between">
              <h1>รายการกาแฟ</h1>
{/*   
              <Button
                component={Link}
                leftSection={<IconPlus />}
                to="/books/create"
                size="xs"
                variant="primary"
                className="flex items-center space-x-2"
              >
                เพิ่มหนังสือ
              </Button> */}
            </div>
  
            {!coffee && !error && <Loading />}
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
              {coffee?.map((cf) => (
                <div className="border border-solid border-neutral-200" key={cf.id}>
                  <div className="p-4">
                    <h2 className="text-lg font-semibold line-clamp-2">{cf.name}</h2>
                    <p className="text-xs text-neutral-500">ราคา {cf.price} $</p>
                  </div>
  
                  <div className="flex justify-end px-4 pb-2">
                    <Button component={Link} to={`/coffee/order`} size="xs" variant="default">
                      สั่งซื้อ
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </Layout>
      </>
    );
  }
  