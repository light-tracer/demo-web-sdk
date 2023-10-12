import { Matrix4 } from './Matrix4.js';
import { Vector3 } from './Vector3.js';
import { Quaternion } from './Quaternion.js';
import { Euler } from './Euler.js';

const _v1 = /*@__PURE__*/ new Vector3();
const _q1 = /*@__PURE__*/ new Quaternion();
const _m1 = /*@__PURE__*/ new Matrix4();
const _target = /*@__PURE__*/ new Vector3();

const _position = /*@__PURE__*/ new Vector3();

class Camera {

	constructor() {

		this.position = new Vector3();
		this.rotation = new Euler();
		this.quaternion = new Quaternion();
		this.scale = new Vector3( 1, 1, 1 );
		this.up = new Vector3( 0, 1, 0 );


    this.modelViewMatrix = new Matrix4();

		this.matrix = new Matrix4();
		this.matrixWorld = new Matrix4();

		this.isCamera = true;

		this.type = 'Camera';

		this.matrixWorldInverse = new Matrix4();

		this.projectionMatrix = new Matrix4();
		this.projectionMatrixInverse = new Matrix4();

	}

	copy( source, recursive ) {

		this.up.copy( source.up );

		this.position.copy( source.position );
		this.rotation.order = source.rotation.order;
		this.quaternion.copy( source.quaternion );
		this.scale.copy( source.scale );

		this.matrix.copy( source.matrix );
		this.matrixWorld.copy( source.matrixWorld );

		this.matrixWorldInverse.copy( source.matrixWorldInverse );

		this.projectionMatrix.copy( source.projectionMatrix );
		this.projectionMatrixInverse.copy( source.projectionMatrixInverse );

		return this;

	}

  lookAt( x, y, z ) {

		// This method does not support objects having non-uniformly-scaled parent(s)

		if ( x.isVector3 ) {

			_target.copy( x );

		} else {

			_target.set( x, y, z );

		}

		const parent = this.parent;

		this.updateWorldMatrix( true, false );

		_position.setFromMatrixPosition( this.matrixWorld );

		if ( this.isCamera || this.isLight ) {

			_m1.lookAt( _position, _target, this.up );

		} else {

			_m1.lookAt( _target, _position, this.up );

		}

		this.quaternion.setFromRotationMatrix( _m1 );

		if ( parent ) {

			_m1.extractRotation( parent.matrixWorld );
			_q1.setFromRotationMatrix( _m1 );
			this.quaternion.premultiply( _q1.invert() );

		}

	}

	getWorldDirection( target ) {

		this.updateWorldMatrix( true, false );

		const e = this.matrixWorld.elements;

		return target.set( - e[ 8 ], - e[ 9 ], - e[ 10 ] ).normalize();

	}

  updateMatrix() {
		this.matrix.compose( this.position, this.quaternion, this.scale );
  }

	updateMatrixWorld( force ) {

		this.updateMatrix();

    this.matrixWorld.copy( this.matrix );

		this.matrixWorldInverse.copy( this.matrixWorld ).invert();

	}

	updateWorldMatrix( updateParents, updateChildren ) {

		this.updateMatrix();

		this.matrixWorld.copy( this.matrix );

		this.matrixWorldInverse.copy( this.matrixWorld ).invert();

	}

	clone() {

		return new this.constructor().copy( this );

	}

}

export { Camera };
