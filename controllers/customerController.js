import { prisma } from "../database/config.js";
import moment from "moment/moment.js"

const addCustomer = async (req, res) => {
    const {
        no_handphone,
        nm_customer,
        id_point,
        point_type,
        alamat,
        point_amount
    } = req.body

    try {
        // generate new id_customer with format C0001
        const lastCustomer = await prisma.customer_point.findFirst({
            orderBy: {
                id_customer: 'desc'
            }
        })

        let newIdCustomer = 'C0001'
        if (lastCustomer) {
            const lastId = lastCustomer.id_customer
            const lastIdNumber = parseInt(lastId.substr(1))
            newIdCustomer = 'C' + ('000' + (lastIdNumber + 1)).slice(-4)
        }

        // store data to customer table
        await prisma.customer_point.create({
            data: {
                id_customer: newIdCustomer,
                nm_customer,
                id_point,
                point_type,
                point_customer: point_amount,
                no_hp_customer: no_handphone,
                address_customer: alamat
            }
        })

        // generate new id_point with format IDP0001
        // count row in point_details table
        const lastPoint = await prisma.point_details.findFirst({
            orderBy: {
                id_point_detail: 'desc'
            }
        })

       let newIdPointDetail = 'IDP0001'; // Assuming 'IDP0001' is the initial ID format
        if (lastPoint) {
            const lastId = lastPoint.id_point_detail; // Corrected to id_point_detail
            const lastIdNumber = parseInt(lastId.substring(3)); // Use substring for clarity
            const nextIdNumber = lastIdNumber + 1;
            newIdPointDetail = `IDP${nextIdNumber.toString().padStart(4, '0')}`; // Simplified ID generation
        }

        // format date to 2024-JUN-01
        const transactionDate = moment().format('YYYY-MMM-DD').toUpperCase()

        // store data to point_details table
        await prisma.point_details.create({
            data: {
                id_point_detail: newIdPointDetail,
                id_customer: newIdCustomer,
                id_point,
                point_amount,
                transaction_type: 'IN',
                transaction_date: transactionDate
            }
        })

        res.status(201).json({
            respon_code: "00",
            message: "Berhasil menambahkan pelanggan",
            data: [{
                id_customer: newIdCustomer,
                nm_customer,
                point_amount
            }]
        })
    } catch (error) {
        res.status(500).json({
            message: "Failed to add customer",
            error: error.message
        })
    }
}

const getCustomer = async (req, res) => {
    const { id_customer } = req.params

    try {
        const customers = await prisma.customer_point.findFirst({
            where: {
                id_customer
            }
        })

        const points = await prisma.point_details.findMany({
            where: {
                id_customer
            }
        })

        // calculate total point
        let totalPoint = 0
        points.map(point => {
            if (point.transaction_type === 'IN') {
                totalPoint += point.point_amount
            } else {
                totalPoint -= point.point_amount
            }
        })

        const point_details = points.map(point => {
            return {
                id_point_detail: point.id_point_detail,
                point_amount: point.point_amount,
                transaction_type: point.transaction_type,
                transaction_date: point.transaction_date
            }
        })

        const customer = {
            id_customer: customers.id_customer,
            total_point: totalPoint,
            id_point: customers.id_point,
            point_type: customers.point_type,
            no_handphone: customers.no_hp_customer.toString(),
            alamat: customers.address_customer,
            point_details
        }

        res.status(200).json({
            ...customer
        })
    } catch (error) {
        res.status(500).json({
            message: "Failed to get customer",
            error: error.message
        })
    }
}

export { addCustomer, getCustomer }