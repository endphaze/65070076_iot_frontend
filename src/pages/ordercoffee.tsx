import { useState } from 'react';
import Layout from "../components/layout";
import cafeBackgroundImage from "../assets/images/bg-cafe-2.jpg";
import useSWR from "swr";
import { Order } from "../lib/models";
import Loading from "../components/loading";
import { Alert, TextInput } from "@mantine/core";
import { IconAlertTriangleFilled } from "@tabler/icons-react";

export default function BooksPage() {
    const { data: order_coffee, error } = useSWR<Order[]>("/orderDetail");
    const [quantities, setQuantities] = useState({
        Espresso: 0,
        Latte: 0,
        Cappuccino: 0
    });

    // Prices for each coffee type
    const prices = {
        Espresso: 40,
        Latte: 45,
        Cappuccino: 50
    };

    // Calculate total price for each coffee type
    const totalByCoffeeType = {
        Espresso: quantities.Espresso * prices.Espresso,
        Latte: quantities.Latte * prices.Latte,
        Cappuccino: quantities.Cappuccino * prices.Cappuccino
    };

    // Calculate overall total price
    const overallTotalPrice = Object.values(totalByCoffeeType).reduce((total, price) => total + price, 0);

    // Handle quantity change
    const handleQuantityChange = (coffee: keyof typeof quantities, value: number) => {
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [coffee]: value >= 0 ? value : 0
        }));
    };

    // Handle form submission
    const handleSubmit = async () => {
        const orders = [
            { coffee_id: 1, quantity: quantities.Espresso, total: totalByCoffeeType.Espresso },
            { coffee_id: 2, quantity: quantities.Latte, total: totalByCoffeeType.Latte },
            { coffee_id: 3, quantity: quantities.Cappuccino, total: totalByCoffeeType.Cappuccino }
        ];

        try {
            const response = await fetch('https://api-two-silk.vercel.app/api/v1/coffee/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orders),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            console.log('Order submitted:', result);
            alert('Order submitted successfully!');
        } catch (error) {
            console.error('Error submitting order:', error);
            alert('Failed to submit order. Please try again later.');
        }
    };

    return (
        <>
            <Layout>
                <section
                    className="h-[200px] w-full text-white bg-orange-800 bg-cover bg-blend-multiply flex flex-col justify-center items-center px-4 text-center"
                    style={{
                        backgroundImage: `url(${cafeBackgroundImage})`,
                    }}
                >
                    <h1 className="text-5xl mb-2">กาแฟ</h1>
                    <h2>รายการกาแฟทั้งหมด</h2>
                </section>

                <section className="container mx-auto py-8">
                    <div className="flex justify-between">
                        <h1>รายการกาแฟ</h1>
                    </div>

                    {!order_coffee && !error && <Loading />}
                    {error && (
                        <Alert
                            color="red"
                            title="เกิดข้อผิดพลาดในการอ่านข้อมูล"
                            icon={<IconAlertTriangleFilled />}
                        >
                            {error.message}
                        </Alert>
                    )}

                    <div className="flex flex-col items-start mb-5">
                        <label>Espresso 40 บาท</label>
                        <label>จำนวน</label>
                        <input
                            type="number"
                            placeholder="Enter a number"
                            value={quantities.Espresso}
                            onChange={(e) => handleQuantityChange('Espresso', +e.target.value)}
                            className="p-1 border border-gray-300 rounded"
                        />
                        <TextInput 
                            label="หมายเหตุ"
                            placeholder="หวานน้อย"
                        />
                        <div>Total for Espresso: {totalByCoffeeType.Espresso} บาท</div>
                    </div>
                    <div className="flex flex-col items-start mb-5">
                        <label>Latte 45 บาท</label>
                        <label>จำนวน</label>
                        <input
                            type="number"
                            placeholder="Enter a number"
                            value={quantities.Latte}
                            onChange={(e) => handleQuantityChange('Latte', +e.target.value)}
                            className="p-1 border border-gray-300 rounded"
                        />
                         <TextInput 
                            label="หมายเหตุ"
                            placeholder="หวานน้อย"
                        />
                        <div>Total for Latte: {totalByCoffeeType.Latte} บาท</div>
                    </div>
                    <div className="flex flex-col items-start mb-5">
                        <label>Cappuccino 50 บาท</label>
                        <label>จำนวน</label>
                        <input
                            type="number"
                            placeholder="Enter a number"
                            value={quantities.Cappuccino}
                            onChange={(e) => handleQuantityChange('Cappuccino', +e.target.value)}
                            className="p-1 border border-gray-300 rounded"
                        />
                         <TextInput 
                            label="หมายเหตุ"
                            placeholder="หวานน้อย"
                        />
                        <div>Total for Cappuccino: {totalByCoffeeType.Cappuccino} บาท</div>
                    </div>

                    <div className="mt-5">
                        <h2 className="text-xl font-semibold">ราคาทุกอย่างรวม: {overallTotalPrice} บาท</h2>
                    </div>

                    <button
                        onClick={handleSubmit}
                        className="mt-5 p-2 bg-blue-500 text-white rounded"
                    >
                        สั่งออเดอร์
                    </button>
                </section>
            </Layout>
        </>
    );
}
