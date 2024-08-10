/* eslint-disable prettier/prettier */
// import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable,OneToMany } from 'typeorm';
// import { Role } from 'src/role/role.entity';
// import { Comment } from 'src/comment/comment.entity'; 
// import { Booking } from 'src/booking/booking.entity'; 

// @Entity('user')
// export class User {
//   @PrimaryGeneratedColumn()
//   userId: number;

//   @Column()
//   userName: string;

//   @Column()
//   password: string;

//   @Column()
//   email: string;

//   @Column()
//   sex: string;

//   @Column()
//   address: string;

//   @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
//   lastUpdate: Date;

//   @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
//   dateAdd: Date;

//   @ManyToMany(() => Role , (role) => role.user, { cascade: true })
//   @JoinTable({
//     name: 'user_role',
//     joinColumns: [{ name: 'userId', referencedColumnName: 'userId' }],
//     inverseJoinColumns: [{ name: 'roleId', referencedColumnName: 'roleId' }]
//   })
//   role: Role[];
//   @OneToMany(() => Comment, (comment) => comment.user)
//   comment: Comment[];

//   @OneToMany(() => Booking, (booking) => booking.user)
//   booking: Booking[];
// }
// user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Comment } from 'src/comment/comment.entity'; 
import { Booking } from 'src/booking/booking.entity';
enum ROLES{
  ADMIN='ADMIN',
  STAFF='STAFF',
  USER='USER'
}
@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  userName: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  sex: string;

  @Column()
  address: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  lastUpdate: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateAdd: Date;

  @Column({ default: ROLES.USER })
  role: ROLES;

  

  @OneToMany(() => Comment, (comment) => comment.user)
  comment: Comment[];

  @OneToMany(() => Booking, (booking) => booking.user)
  booking: Booking[];



}
