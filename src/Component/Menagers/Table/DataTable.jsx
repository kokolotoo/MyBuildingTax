import { Input } from 'antd';

const DataTable = ({currPerson, setCurrPerson, changeMenager}) => {
    return (
        <tbody>
            <tr>
                <td>
                    {changeMenager ?
                        <Input
                            type="text"
                            name="name"
                            placeholder="Email"
                            value={currPerson.name}
                            onChange={(e) => setCurrPerson({ ...currPerson, name: e.target.value })}
                        /> :
                        currPerson.name}
                </td>
                <td>
                    {changeMenager ?
                        <Input
                            type="text"
                            name="phone"
                            placeholder="Email"
                            value={currPerson.phone}
                            onChange={(e) => setCurrPerson({ ...currPerson, phone: e.target.value })}
                        /> :
                        currPerson.phone}
                </td>
                <td>
                    {changeMenager ?
                        <Input
                            type="text"
                            name="apartment"
                            placeholder="Email"
                            value={currPerson.apartment}
                            onChange={(e) => setCurrPerson({ ...currPerson, apartment: e.target.value })}
                        /> :
                        currPerson.apartment}
                </td>
            </tr>
        </tbody>
    )
}

export default DataTable
